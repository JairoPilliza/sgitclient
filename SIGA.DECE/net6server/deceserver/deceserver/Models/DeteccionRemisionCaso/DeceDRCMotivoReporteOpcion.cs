namespace deceserver.Models.DeteccionRemisionCaso
{
    public class DeceDRCMotivoReporteOpcion
    {
        public int idDeceDRCMotivoReporteOpcion { get; set; }
        public int codigo { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
        public bool estado { get; set; }
    }
}
