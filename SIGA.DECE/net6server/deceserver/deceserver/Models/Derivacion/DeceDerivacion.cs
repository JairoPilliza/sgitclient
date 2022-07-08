namespace deceserver.Models.Derivacion
{
    public class DeceDerivacion
    {
        public int idDeceDerivacion { get; set; }
        public int idDeceDerivacionOpcion { get; set; }
        // public List<DeceDerivacionOpcion>? x { get; set; }
        public int codAlumno { get; set; }
        public string? nombreAlumno { get; set; }
        public string? nombreInstitucion { get; set; }
        public string? direccionInstitucion { get; set; }
        public string? contactoInstitucion { get; set; }
        public string? nombreQuienDeriva { get; set; }
        public string? contactoQuienDeriva { get; set; }
        public string? cargoQuienDeriva { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public string? curso { get; set; }
        public int? gestion { get; set; }
        public int? idModalidad { get; set; }
        public string? modalidad { get; set; }
        public int? idGrado { get; set; }
        public string? codigoGrado { get; set; }
        public string? descripcionGrado { get; set; }
        public int? idParalelo { get; set; }
        public string? paralelo { get; set; }
        public int? idTurno { get; set; }
        public string? turno { get; set; }
        public DateTime fechaDerivacion { get; set; }
        public DateTime fechaRegistro { get; set; }

    }
}
