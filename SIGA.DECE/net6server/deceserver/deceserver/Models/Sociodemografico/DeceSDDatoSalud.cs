namespace deceserver.Models.Sociodemografico
{
    public class DeceSDDatoSalud
    {
        public int idDeceSDDatoSalud { get; set; }
        public int idDeceSociodemografico { get; set; }
        //public int idDeceSDDatoSaludOpcion { get; set; }
        public List<DeceSDDatoSaludOpcion> datoS { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
