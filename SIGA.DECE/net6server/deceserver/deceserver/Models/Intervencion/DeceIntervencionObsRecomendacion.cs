namespace deceserver.Models.Intervencion
{
    public class DeceIntervencionObsRecomendacion
    {
        public int idDeceIntervencionObsRecomendacion { get; set; }
        public int idDeceIntervencion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
