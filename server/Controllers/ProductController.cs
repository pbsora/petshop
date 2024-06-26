using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Newtonsoft.Json;
using server.DTOs.Products;
using server.Model;
using server.Pagination.QueryParams;
using server.Repositories.ProductRepo;
using X.PagedList;

namespace server.Controllers
{
    [ApiController]
    [Route("api/products")]
    [EnableRateLimiting("fixedWindow")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IPagedList<ProductDTO>>> GetAsync(
            [FromQuery] ProductsParams productsParams
        )
        {
            Request.Headers.TryGetValue("X-Access-Token", out var paginationHeader);
            System.Console.WriteLine(paginationHeader);
            var products = await _repository.GetProducts(productsParams);
            if (products.Count() == 0)
                return NotFound("No products found");

            return GetPaginatedProducts(products);
        }

        [HttpGet("{id}", Name = "GetProductByIdAsync")]
        public async Task<ActionResult<ProductDTO>> GetProductByIdAsync(string id)
        {
            var product = await _repository.GetProductById(id);
            if (product is null)
                return NotFound("Product not found");
            return Ok(product);
        }

        [HttpGet("slug/{slug}")]
        public async Task<ActionResult<ProductDTO>> GetProductBySlugAsync(string slug)
        {
            var product = await _repository.GetProductBySlug(slug);

            if (product == null)
                return BadRequest("Product not found");

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<NewProductDTO>> PostAsync(
            [FromBody] NewProductDTO newProductDTO
        )
        {
            var newProduct = _mapper.Map<Product>(newProductDTO);

            var createdProduct = await _repository.CreateProduct(newProduct);

            var createdProductDTO = _mapper.Map<ProductDTO>(createdProduct);

            return CreatedAtRoute(
                nameof(GetProductByIdAsync),
                new { id = createdProduct.ProductsId },
                createdProductDTO
            );
        }

        [HttpPut("{id}")]
        public IActionResult PutAsync(string id, [FromBody] ProductUpdateDTO productDTO)
        {
            if (id != productDTO.ProductsId.ToString())
                return BadRequest("Product ID mismatch");

            var product = _mapper.Map<Product>(productDTO);
            var UpdatedProduct = _repository.UpdateProduct(product);

            return Ok(_mapper.Map<ProductUpdateDTO>(UpdatedProduct));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var product = await _repository.GetProductById(id);

            if (product is null)
                return NotFound("Product not found");

            var productToDelete = _mapper.Map<Product>(product);

            _repository.DeleteProduct(productToDelete);

            return Ok(_mapper.Map<ProductDTO>(productToDelete));
        }

        private ActionResult<IPagedList<ProductDTO>> GetPaginatedProducts(
            IPagedList<ProductDTO> products
        )
        {
            var metadata = new
            {
                products.Count,
                products.PageSize,
                products.PageCount,
                products.TotalItemCount,
                products.HasNextPage,
                products.HasPreviousPage,
                products.PageNumber
            };

            Response.Headers.Append("X-Pagination", JsonConvert.SerializeObject(metadata));
            return Ok(products);
        }
    }
}
