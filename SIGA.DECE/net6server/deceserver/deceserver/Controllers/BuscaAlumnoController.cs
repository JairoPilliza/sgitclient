using deceserver.Daos;
using deceserver.Models;
using deceserver.Resources;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace deceserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuscaAlumnoController : ControllerBase
    {
        private readonly JwtResource _JwtSRC = new();
        private readonly BuscaAlumnoDao _bal = new();
        private StructureResponse _result = new();

        [HttpGet("Get")]
        public async Task<IActionResult> GetAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

            _result = await _bal.GetAsync(authClientJson, json);

            return Ok(_result);
        }
    }
}
