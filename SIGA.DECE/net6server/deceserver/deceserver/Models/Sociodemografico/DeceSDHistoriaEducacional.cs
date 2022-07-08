namespace deceserver.Models.Sociodemografico
{
    public class DeceSDHistoriaEducacional
    {
        public int idDeceSDHistoriaEducacional { get; set; }
        public int idDeceSociodemografico { get; set; }
        //public int idDeceSDHistoriaEducacionalOpcion { get; set; }
        public List<DeceSDHistoriaEducacionalOpcion> histE { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
