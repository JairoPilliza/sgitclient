namespace deceserver.Models.Intervencion
{
    public class DeceIntervencion
    {
        public int idDeceIntervencion { get; set; }
        public int idDeceIntervencionSesionSeguimientoOpcion { get; set; }
        public List<DeceIntervencionAreaOpcion>? ao { get; set; }
        public List<DeceIntervencionRiesgoIdentificado>? riesgo { get; set; }
        public List<DeceIntervencionDestinatario>? dest { get; set; }
        public DateTime fechaRegistro { get; set; }
        public int? codAlumno { get; set; }
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
