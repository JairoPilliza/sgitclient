namespace deceserver.Models.AtencionRepresentante
{
    public class DeceAtencionRepresentante
    {
        public int idDeceAtencionRepresentante { get; set; }
        public string? codigo { get; set; }
        public DateTime fechaAtencion { get; set; }
        public string? medioAtencion { get; set; }
        public string? curso { get; set; }
        public int codAlumno { get; set; }
        public string? nombreAlumno { get; set; }
        public string? representante { get; set; }
        public string? asunto { get; set; }
        public string? actividadRealizada { get; set; }
        public string? acuerdosCompromisos { get; set; }
        public string? evidencia { get; set; }
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
