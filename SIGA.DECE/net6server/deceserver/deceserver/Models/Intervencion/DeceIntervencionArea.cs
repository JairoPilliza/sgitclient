namespace deceserver.Models.Intervencion
{
    public class DeceIntervencionArea
    {
        public int idDeceIntervencionArea { get; set; }
        public int idDeceIntervencion { get; set; }
        public int idDeceIntervencionAreaOpcion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
