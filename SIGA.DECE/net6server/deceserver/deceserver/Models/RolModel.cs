namespace deceserver.Models
{
    public class RolModel
    {
        public int idAcceso { get; set; }
        public int idSucursal { get; set; }
        public bool predeterminado { get; set; }
        public int idUsuario { get; set; }
        public string codUsuario { get; set; } = string.Empty;        
        public string nombreCompleto { get; set; } = string.Empty;
        public int idRol { get; set; }
        public string descripcion { get; set; } = string.Empty;
    }
}
