namespace deceserver.Models.Intervencion
{
    public class DeceIntervencionRiesgoIdentificado
    {
        public int idDeceIntervencionRiesgoIdentificado { get; set; }
        public int idDeceIntervencion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
