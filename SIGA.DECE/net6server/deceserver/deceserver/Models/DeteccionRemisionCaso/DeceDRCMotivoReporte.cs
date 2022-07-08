namespace deceserver.Models.DeteccionRemisionCaso
{
    public class DeceDRCMotivoReporte
    {
        public int idDeceDRCMotivoReporte { get; set; }
        public int idDeceDeteccionRemisionCaso { get; set; }

       // public int idDeceDRCMotivoReporteOpcionDetalle { get; set; }
        public List<DeceDRCMotivoReporteOpcionDetalle> ropdet { get; set; }
        public DateTime fechaRegistro { get; set; }
        public int idUsuario { get; set; }
    }
}
