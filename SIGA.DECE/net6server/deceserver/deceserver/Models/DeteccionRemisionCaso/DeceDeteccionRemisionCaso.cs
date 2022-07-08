namespace deceserver.Models.DeteccionRemisionCaso
{
    public class DeceDeteccionRemisionCaso
    {
        public int idDeceDeteccionRemisionCaso { get; set; }
        public string? codigo { get; set; }
        public string? estadoVersion { get; set; }
        public bool estadoCierre { get; set; }
        public DateTime fechaDeteccionRemision { get; set; }
        public int codAlumno { get; set; }
        public string? nombreAlumno { get; set; }
        public string? curso { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public DateTime fechaReporte { get; set; }
        public int codigoReportadoX { get; set; }
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
