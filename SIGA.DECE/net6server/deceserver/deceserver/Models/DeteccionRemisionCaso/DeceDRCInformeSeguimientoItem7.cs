namespace deceserver.Models.DeteccionRemisionCaso
{
    public class DeceDRCInformeSeguimientoItem7
    {
        public int idDeceDRCInformeSeguimientoItem7 { get; set; }
        public int idDeceDeteccionRemisionCaso { get; set; }
        public List<DeceDRCInformeSeguimientoItem7Opcion>? issop { get; set; }
        public List<DeceDRCAccionRealizarItem7> acr { get; set; }
        //public int idDeceDRCInformeSeguimientoItem7Opcion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
