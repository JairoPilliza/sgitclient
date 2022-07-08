using deceserver.Models;
using deceserver.Resources;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace deceserver.Filters
{
    public class JwtFilter : IAsyncActionFilter
    {
        /*no mover, las instacias fuera de los metodos se matienen abiertas mientras el poll de la app no sea reseteado*/
        public static Dictionary<int, AuthModel?> accessesDiscionary = new Dictionary<int, AuthModel?>();

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // instance model result
            var _resp = new StructureResponse();

            // init result model
            _resp.toString("1", "200 OK", "UAuth");

            // recover name controller request
            string? nameController = context.Controller.ToString();
            // recover name action request
            string? nameAction = context.ActionDescriptor.ToString();
             nameAction = context.ActionDescriptor.DisplayName.ToString();

            // init variable that evalue JWT
            var tokenIsValid = false;

            // init var token for read JWT //var dataAnotationIsValid = false;
            var token = "";


            


            if (!context.ModelState.IsValid)
            {
                string errors = "";
                foreach (var item in context.ModelState.Select(x => x.Value.Errors).Where(y => y.Count > 0).ToList())
                {
                    errors += " | " + item[0].ErrorMessage;
                }
                _resp.toString("0", errors, "Completa los campos requeridos");
            }




            // evalue nameController 
            if ((nameController == "Login" && nameAction == "GetAsync") || !(nameController == "Login"))
            {
                // init result model
                _resp.toString("0", "Usuario no autorizado", "");

                // open block try
                try
                {
                    // retrieve header from request
                    var encabezados = context.HttpContext.Request;

                    // evaluate existence of key Authorization
                    if (!string.IsNullOrEmpty(encabezados.Headers["Authorization"]))
                    {
                        // retrieve the value of the key Authorization
                        token = encabezados.Headers["Authorization"];

                        // send the value of key Authorization to validate
                        tokenIsValid = new JwtResource().validateJwt(token);
                    }
                }
                catch (Exception e)
                {
                    // init result model
                    _resp.toString("0", "Usuario no autorizado, detalle de error => " + e.Message, "");

                    // set token error
                    tokenIsValid = false;
                }
            }

            // verify params required of the models
            //dataAnotationIsValid = context.ModelState.IsValid;
            //if (!context.ModelState.IsValid)
            //{
            //    string errors = "";
            //    foreach (var item in context.ModelState.Select(x => x.Value.Errors).Where(y => y.Count > 0).ToList())
            //    {
            //        errors += " | " + item[0].ErrorMessage;
            //    }
            //    _resp.toString("0", errors, "Completa los campos requeridos");
            //}

            tokenIsValid = true;
            // name controller when equals "Login" dont required authorize
            if (nameController == "Login" && nameAction == "GetAsync" && tokenIsValid)
            {
                await next();
            }

            // evaluates if the token is valid.
            if (tokenIsValid && !(nameController == "Login"))
            {
                await next();
            }
            else
            {
                // code 200 OK, custom error message 
                context.Result = new JsonResult(_resp);

                /*Codigo 404 error bacd request, mensaje personalizado */
                //context.Result = new BadRequestObjectResult("Usuario no autorizado");
            }
        }
    }
}
