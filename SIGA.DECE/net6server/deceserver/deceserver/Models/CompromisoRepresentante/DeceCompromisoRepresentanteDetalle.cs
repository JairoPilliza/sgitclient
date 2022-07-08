namespace deceserver.Models.CompromisoRepresentante
{
    public class DeceCompromisoRepresentanteDetalle
    {
        public int idDeceCompromisoRepresentanteDetalle { get; set; }
        public int idDeceCompromisoRepresentante { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
