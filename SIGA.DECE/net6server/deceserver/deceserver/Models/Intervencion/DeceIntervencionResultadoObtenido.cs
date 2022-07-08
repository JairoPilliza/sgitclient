namespace deceserver.Models.Intervencion
{
    public class DeceIntervencionResultadoObtenido
    {
        public int idDeceIntervencionResultadoObtenido { get; set; }
        public int idDeceIntervencion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
