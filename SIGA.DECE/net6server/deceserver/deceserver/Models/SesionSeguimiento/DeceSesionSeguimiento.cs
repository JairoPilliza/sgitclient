namespace deceserver.Models.SesionSeguimiento
{
    public class DeceSesionSeguimiento
    {
        public int idDeceSesionSeguimiento { get; set; }
        public int idDeceIntervencionSesionSeguimientoOpcion { get; set; }
        public int codAlumno { get; set; }
        public string? nombreAlumno { get; set; }
        public string? curso { get; set; }
        public string? dificultadDetectada { get; set; }
        public string? nombreProfesional { get; set; }
        public DateTime fechaInicioIntervencion { get; set; }
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
