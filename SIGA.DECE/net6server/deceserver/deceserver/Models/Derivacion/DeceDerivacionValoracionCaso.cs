namespace deceserver.Models.Derivacion
{
    public class DeceDerivacionValoracionCaso
    {
        public int idDeceDerivacionValoracionCaso { get; set; }
        public int idDeceDerivacion { get; set; }                
        public string? motivoReferencia { get; set; }
        public string? descripcionProblematica { get; set; }
        public string? accionDesarrollada { get; set; }
        public string? observaciones { get; set; }        
        public DateTime fechaRegistro { get; set; }
    }
}
