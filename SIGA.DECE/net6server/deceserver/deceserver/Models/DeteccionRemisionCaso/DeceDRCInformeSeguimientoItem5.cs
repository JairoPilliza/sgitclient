namespace deceserver.Models.DeteccionRemisionCaso
{
    public class DeceDRCInformeSeguimientoItem5
    {
        public int idDeceDRCInformeSeguimientoItem5 { get; set; }
        public int idDeceDeteccionRemisionCaso { get; set; }
        public List<DeceDRCInformeSeguimientoItem5Opcion> isop { get; set; }
        public List<DeceDRCAcuerdoEstablecido> dae { get; set; }
        //public int idDeceDRCInformeSeguimientoItem5Opcion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
