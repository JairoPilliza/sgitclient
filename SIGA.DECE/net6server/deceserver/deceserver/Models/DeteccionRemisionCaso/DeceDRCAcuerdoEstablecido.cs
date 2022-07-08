namespace deceserver.Models.DeteccionRemisionCaso
{
    public class DeceDRCAcuerdoEstablecido
    {
        public int idDeceDRCAcuerdoEstablecido { get; set; }
        public int idDeceDeteccionRemisionCaso { get; set; }
        public string? acuerdoPadre { get; set; }
        public string? acuerdoAlumno { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
