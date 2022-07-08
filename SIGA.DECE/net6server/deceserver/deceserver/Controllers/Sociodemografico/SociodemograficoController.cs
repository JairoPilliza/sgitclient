using deceserver.Daos.Sociodemografico;
using deceserver.Models;
using deceserver.Resources;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace deceserver.Controllers.Sociodemografico
{
    [Route("api/[controller]")]
    [ApiController]
    public class SociodemograficoController : ControllerBase
    {
        private readonly JwtResource _JwtSRC = new();
        private readonly SociodemograficoDao _dii = new();
        private StructureResponse _result = new();

        /* 
         * 
         * REQUEST's OF SECTIONS SOCIODEMOGRAFICO FORM 
         * 
         */
        [HttpGet("Get")]/* ojo se debe crear un metodo para listar los formularios - este metodo no est[a funcional*/
        public async Task<IActionResult> GetAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _dii.GetAsync(authClientJson, json);

            return Ok(_result);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

             _result = await _dii.DeleteAsync(authClientJson, json);

            return Ok(_result);
        }

    }
}
