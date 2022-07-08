namespace deceserver.Models.SeguimientoCasoIndividual
{
    public class DeceSeguimientoCasoIndividual
    {
        public int idDeceSeguimientoCasoIndividual { get; set; }
        
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
        public int codAlumno { get; set; }
        public string? nombreAlumno { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public string? curso { get; set; }
        public DateTime fechaAperturaSeguimiento { get; set; }
        public string? nombreRemitente { get; set; }
        public string? nombreInstitucion { get; set; }
        public string? accionesRealizadas { get; set; }
        public string? acuerdos { get; set; }
        public string? recomendacionesSugerencias { get; set; }
        public DateTime fechaRegistro { get; set; }
     
    }
}
