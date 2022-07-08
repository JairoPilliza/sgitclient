namespace deceserver.Models.Sociodemografico
{
    public class DeceSDViviendaServicio
    {
        public int idDeceSDViviendaServicio { get; set; }
        public int idDeceSociodemografico { get; set; }
        public int idDeceSDViviendaServicioOpcion { get; set; }
       
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
