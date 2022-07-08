namespace deceserver.Models.Derivacion
{
    public class DeceDerivacionDatoPersonalDerivado
    {
        public int idDeceDerivacionDatoPersonalDerivado { get; set; }
        public int idDeceDerivacion { get; set; }
        public int codAlumno { get; set; }
        public string? nombreAlumno { get; set; }
        public int idGenero { get; set; }
        public int edad { get; set; } 
        public DateTime fechaNacimiento { get; set; }
        public string? curso { get; set; }
        public string? direccionDomiciliaria { get; set; }
        public string? nombrePadre { get; set; }
        public string? numeroTelefonico { get; set; }
        public string? nombreMadre { get; set; }
        public DateTime fechaRegistro { get; set; }
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

    }
}
