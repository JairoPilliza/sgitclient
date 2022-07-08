using deceserver.Models;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace deceserver.Resources
{
    //public class JwtResource<Entity> : DelegatingHandler where Entity : class
    public class JwtResource : DelegatingHandler
    {
        private readonly IConfiguration _config;
        public JwtResource()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            _config = builder.Build();
        }


        public string Create(AuthModel? authm)
        {
            string tokenString = "";
            try
            {
                if (authm == null)
                    return tokenString;

                // serializa la data a json
                var xjson = JsonConvert.SerializeObject(authm);

                // crea un reclamo personalizado
                var _claims = new[] { new Claim("xjson", xjson) };

                /* HACER VVALIDAR LA CLAVE SECRETA    OOOOOOOOOOOOOOOOOJJJJJJJJJJJJJJJJJJJJJJJJJJJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */
                var token = new JwtSecurityToken
                (
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Audience"],
                    claims: _claims,
                    expires: DateTime.UtcNow.AddHours(-5).AddDays(60),
                    notBefore: DateTime.UtcNow.AddHours(-5),
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"])),
                        SecurityAlgorithms.HmacSha256)
                );

                tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception e)
            {
                tokenString = "";
                _ = e.Message;
            }

            return tokenString;

        }

        public bool validateJwt(string token)
        {
            if (string.IsNullOrEmpty(token) || string.IsNullOrWhiteSpace(token))
                return false;

            if (!token.Contains("Bearer"))
                return false;

            token = token.Replace("Bearer ", "");

            if (!token.Contains("."))
                return false;

            if (string.IsNullOrEmpty(token) || string.IsNullOrWhiteSpace(token))
                return false;


            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                _ = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    LifetimeValidator = LifetimeValidator,
                    ValidIssuer = _config["Jwt:Issuer"],
                    ValidAudience = _config["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]))
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }
        // algoritmo delegado para validar el tiempo de expiracion del jwt
        public bool LifetimeValidator(DateTime? dateInit, DateTime? dateExpire, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            var valid = false;
            var date = DateTime.UtcNow.AddHours(-5);
            if ((dateExpire.HasValue && date < dateExpire) && (dateInit.HasValue && date > dateInit))
                valid = true;

            return valid;
        }
        public T? GetClaimJsonJwt<T>(string token, string nameClaim)
        {
            token = token.Replace("Bearer ", "");
            string xclaim = "";
            JwtSecurityToken? jwtST = null;
            JwtSecurityTokenHandler jwtSTH = new JwtSecurityTokenHandler(); //string authHeader = Request.Headers["Authorization"]; //authHeader = authHeader.Replace("Bearer ", ""); //var jsonToken = handler.ReadToken(jwt);

            // verifica posibilidad de lectura
            if (jwtSTH.CanReadToken(token))
                jwtST = jwtSTH.ReadJwtToken(token);

            // verfica que el valor no sea null
            if (!Equals(jwtST, null))
                xclaim = jwtST.Claims.First(claim => claim.Type == nameClaim).Value;

            return Equals(jwtST, null) ? default(T) : JsonConvert.DeserializeObject<T>(xclaim);
        }

        public string GetClaimJwt(string token, string nameClaim)
        {
            token = token.Replace("Bearer ", "");
            string xclaim = "";
            JwtSecurityToken? jwtst = null;
            JwtSecurityTokenHandler jwtsth = new JwtSecurityTokenHandler(); //string authHeader = Request.Headers["Authorization"]; //authHeader = authHeader.Replace("Bearer ", ""); //var jsonToken = handler.ReadToken(jwt);

            // verifica posibilidad de lectura
            if (jwtsth.CanReadToken(token))
                jwtst = jwtsth.ReadJwtToken(token) as JwtSecurityToken;

            // verfica que el valor no sea null
            if (!Equals(jwtst, null))
                xclaim = jwtst.Claims.First(claim => claim.Type == nameClaim).Value;

            return xclaim;
        }
    }
}
