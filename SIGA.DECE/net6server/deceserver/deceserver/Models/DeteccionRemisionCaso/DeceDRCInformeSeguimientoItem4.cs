namespace deceserver.Models.DeteccionRemisionCaso
{
    public class DeceDRCInformeSeguimientoItem4
    {
        public int idDeceDRCInformeSeguimientoItem4 { get; set; }
        public int idDeceDeteccionRemisionCaso { get; set; }
        public List<DeceDRCInformeSeguimientoItem4Opcion>? isiop  { get; set; }
        //public int idDeceDRCInformeSeguimientoItem4Opcion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
