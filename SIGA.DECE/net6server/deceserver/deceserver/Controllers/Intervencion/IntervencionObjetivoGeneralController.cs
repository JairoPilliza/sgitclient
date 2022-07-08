using deceserver.Daos.Intervencion;
using deceserver.Models;
using deceserver.Models.Intervencion;
using deceserver.Resources;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace deceserver.Controllers.Intervencion
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntervencionObjetivoGeneralController : ControllerBase
    {
        private readonly JwtResource _JwtSRC = new();
        private readonly DeceIntervencionObjetivoGeneralDao _iobg = new();
        private StructureResponse _result = new();

        [HttpGet("Get")]
        public async Task<IActionResult> GetAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _iobg.GetAsync(authClientJson, json);

            return Ok(_result);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> Post([FromBody] DeceIntervencionObjetivoGeneral jsonData)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _iobg.PostAsync(authClientJson, JsonConvert.SerializeObject(jsonData));

            return Ok(_result);
        }

        [HttpPut("Put")]
        public async Task<IActionResult> PutAsync([FromQuery] string json, [FromBody] DeceIntervencionObjetivoGeneral jsonData)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _iobg.PutAsync(authClientJson, json, JsonConvert.SerializeObject(jsonData));

            return Ok(_result);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _iobg.DeleteAsync(authClientJson, json);

            return Ok(_result);
        }
    }
}
