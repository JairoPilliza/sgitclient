using deceserver.Daos.Sociodemografico;
using deceserver.Filters;
using deceserver.Interfaces;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddScoped<>(); 
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("*");//.SetIsOriginAllowed(allow => true); //
        });
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add(typeof(JwtFilter));
});

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddAuthorization();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = ".NET 6 With React Client", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

// deacuerdo a doc 
app.UseSwagger();

app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = ".NET 6 With React Client";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API .Net 6 and Jwt Authorize ");
    if (!app.Environment.IsDevelopment())
        swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

//paradidese
app.UseRouting();

app.UseCors("CORSPolicy");

//paradidese app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();
//paradidese app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllers();
//});

app.Run();
