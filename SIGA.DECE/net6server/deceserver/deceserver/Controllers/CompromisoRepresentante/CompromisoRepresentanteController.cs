using deceserver.Daos.CompromisoRepresentante;
using deceserver.Models;
using deceserver.Models.CompromisoRepresentante;
using deceserver.Resources;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace deceserver.Controllers.CompromisoRepresentante
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompromisoRepresentanteController : ControllerBase
    {
        private readonly JwtResource _JwtSRC = new();
        private readonly DeceCompromisoRepresentanteDao _dcr = new();
        private StructureResponse _result = new();

        [HttpGet("Get")]
        public async Task<IActionResult> GetAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _dcr.GetAsync(authClientJson, json);

            return Ok(_result);
        }
        [HttpGet("GetById")]
        public async Task<IActionResult> GetByIdAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

            _result = await _dcr.GetByIdAsync(authClientJson, json);

            return Ok(_result);
        }


        [HttpPost("Post")]
        public async Task<IActionResult> Post([FromBody] DeceCompromisoRepresentante jsonData)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _dcr.PostAsync(authClientJson, JsonConvert.SerializeObject(jsonData));

            return Ok(_result);
        }

        [HttpPut("Put")]
        public async Task<IActionResult> PutAsync([FromQuery] string json, [FromBody] DeceCompromisoRepresentante jsonData)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

            _result = await _dcr.PutAsync(authClientJson, json, JsonConvert.SerializeObject(jsonData));

            return Ok(_result);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

            _result = await _dcr.DeleteAsync(authClientJson, json);

            return Ok(_result);
        }
    }
}
