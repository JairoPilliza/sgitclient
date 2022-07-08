﻿using deceserver.Daos.Derivacion;
using deceserver.Models;
using deceserver.Models.Derivacion;
using deceserver.Resources;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace deceserver.Controllers.Derivacion
{
    [Route("api/[controller]")]
    [ApiController]
    public class DerivacionInstitucionExternaController : Controller
    {
        private readonly JwtResource _JwtSRC = new();
        private readonly DeceDerivacionInstitucionExternaDao _ddi = new();
         private  StructureResponse _result = new();

        [HttpGet("Get")]
        public async Task<IActionResult> GetAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

            _result = await _ddi.GetAsync(authClientJson, json);

            return Ok(_result);
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetByIdAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

            _result = await _ddi.GetByIdAsync(authClientJson, json);

            return Ok(_result);
        }
        [HttpPost("Post")]
        public async Task<IActionResult> PostAsync([FromBody] DeceDerivacionInstitucionExterna jsonData)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

            _result = await _ddi.PostAsync(authClientJson, JsonConvert.SerializeObject(jsonData));

            return Ok(_result);
        }

        [HttpPut("Put")]
        public async Task<IActionResult> PutAsync([FromQuery] string json, [FromBody] DeceDerivacionInstitucionExterna jsonData)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

            _result = await _ddi.PutAsync(authClientJson, json, JsonConvert.SerializeObject(jsonData));

            return Ok(_result);
        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteAsync([FromQuery] string json)
        {
            string token = HttpContext.Request.Headers.Single(x => x.Key == "Authorization").Value;

            string authClientJson = JsonConvert.SerializeObject(_JwtSRC.GetClaimJsonJwt<AuthModel>(token, "xjson"));

            _result = await _ddi.DeleteAsync(authClientJson, json);

            return Ok(_result);
        }
    }
}
