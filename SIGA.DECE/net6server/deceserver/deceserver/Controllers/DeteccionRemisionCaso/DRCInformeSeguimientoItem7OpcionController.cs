using deceserver.Daos.DeteccionRemisionCaso;
using deceserver.Models;
using deceserver.Models.DeteccionRemisionCaso;
using deceserver.Resources;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace deceserver.Controllers.DeteccionRemisionCaso
{
    [Route("api/[controller]")]
    [ApiController]
    public class DRCInformeSeguimientoItem7OpcionController : ControllerBase
    {
        private readonly JwtResource _JwtSRC = new();
        private readonly DeceDRCInformeSeguimientoItem7OpcionDao _drcitem7op = new();
        private StructureResponse _result = new();

        [HttpGet("Get")]
        public async Task<IActionResult> GetAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _drcitem7op.GetAsync(authClientJson, json);

            return Ok(_result);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> Post([FromBody] DeceDRCInformeSeguimientoItem7Opcion jsonData)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _drcitem7op.PostAsync(authClientJson, JsonConvert.SerializeObject(jsonData));

            return Ok(_result);
        }

        [HttpPut("Put")]
        public async Task<IActionResult> PutAsync([FromQuery] string json, [FromBody] DeceDRCInformeSeguimientoItem7Opcion jsonData)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _drcitem7op.PutAsync(authClientJson, json, JsonConvert.SerializeObject(jsonData));

            return Ok(_result);
        }


        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _drcitem7op.DeleteAsync(authClientJson, json);

            return Ok(_result);
        }
    }
}
