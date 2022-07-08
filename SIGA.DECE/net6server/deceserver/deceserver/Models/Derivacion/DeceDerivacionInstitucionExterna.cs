namespace deceserver.Models.Derivacion
{
    public class DeceDerivacionInstitucionExterna
    {
        public int idDeceDerivacionInstitucionExterna{ get; set; }
        public int idDeceDerivacion { get; set; }
       // public int idDeceDerivacionInstitucionExternaOpcion { get; set; }
        public List<DeceDerivacionInstitucionExternaOpcion>? dieop { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
        
    }
}
