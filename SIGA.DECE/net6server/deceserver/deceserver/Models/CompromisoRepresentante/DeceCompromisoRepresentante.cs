namespace deceserver.Models.CompromisoRepresentante
{
    public class DeceCompromisoRepresentante
    {
        public int idDeceCompromisoRepresentante { get; set; }
        public string? codigo { get; set; }
        public DateTime fechaCompromiso { get; set; }
        public string? nombreRepresentante { get; set; }
        public string? cedulaRepresentante { get; set; }
        public int? codAlumno { get; set; }
        public string? nombreAlumno { get; set; }
        public string? curso { get; set; }
        public List<DeceCompromisoRepresentanteDetalle> detalle { get; set; }
        public string? docente { get; set; }
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
