using deceserver.Daos;
using deceserver.Models;
using deceserver.Resources;
using deceserver.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace deceserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private StructureResponse _result = new StructureResponse();
        private readonly JwtResource _JwtSRC = new();
        private readonly LoginService _login = new();

        [HttpGet("Get")]
        public async Task<IActionResult> GetAsync()
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            AuthModel? authClientJson = _JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson");

            _result = await _login.Auth(authClientJson);

            return Ok(_result);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> Post([FromBody] AuthModel jsonData)
        {
            _result = await _login.LogIn(jsonData);

            return Ok(_result);
        }

    }
}
