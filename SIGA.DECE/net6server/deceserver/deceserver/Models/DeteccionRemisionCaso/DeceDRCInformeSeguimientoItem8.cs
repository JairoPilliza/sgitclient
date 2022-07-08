namespace deceserver.Models.DeteccionRemisionCaso
{
    public class DeceDRCInformeSeguimientoItem8
    {
        public int idDeceDRCInformeSeguimientoItem8 { get; set; }
        public int idDeceDeteccionRemisionCaso { get; set; }
        public List<DeceDRCInformeSeguimientoItem8Opcion>? issp { get; set; }
        //public int idDeceDRCInformeSeguimientoItem8Opcion { get; set; }
        public DeceDRCAcuerdosItem8 ace { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
