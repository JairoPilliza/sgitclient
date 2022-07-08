namespace deceserver.Models
{
    public class AuthModel
    {
        public string codUsuario { get; set; } = "";
        public string contrasena { get; set; } = "";
        public int gestion { get; set; } /* no */
        public int idSucursal { get; set; }
        public int idUsuario { get; set; }
        public string nombreUsuario { get; set; } = "";
        public int idRol { get; set; }
        public string nombreRol { get; set; } = ""; 
    }
}
