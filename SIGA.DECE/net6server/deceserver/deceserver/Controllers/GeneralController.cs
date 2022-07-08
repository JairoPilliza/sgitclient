using deceserver.Daos.Sociodemografico;
using deceserver.Models;
using deceserver.Resources;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace deceserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralController : ControllerBase
    {
        //private readonly IHttpContextAccessor _contextAccessor;
        private readonly JwtResource _JwtSRC = new();
        private readonly DeceSDEstadoCivilDao _ecd = new();
        private readonly DeceSDParentescoOpcionDao _pod = new();
        private readonly DeceSDInstruccionOpcionDao _iod = new();
        private StructureResponse _result = new();

        [HttpGet("EstadoCivil")]
        public async Task<IActionResult> EstadoCivil([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _ecd.GetAsync(authClientJson, json);

            return Ok(_result);
        }
        [HttpGet("GradoInstruccion")]
        public async Task<IActionResult> GradoInstruccion([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _iod.GetAsync(authClientJson, json);

            return Ok(_result);
        }

        [HttpGet("Parentesco")]
        public async Task<IActionResult> Parentesco([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _pod.GetAsync(authClientJson, json);

            return Ok(_result);
        }
    }
}
