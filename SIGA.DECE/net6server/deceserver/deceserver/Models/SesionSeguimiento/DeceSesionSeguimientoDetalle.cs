namespace deceserver.Models.SesionSeguimiento
{
    public class DeceSesionSeguimientoDetalle
    {

        public int idDeceSesionSeguimiento { get; set; }
        public int idDeceSesionSeguimientoDetalle { get; set; }
        public DateTime fecha { get; set; }
        public string? areasTrabajadas { get; set; }
        public string? actividadesPlanificadas { get; set; }
        public string? materialesUtilizar { get; set; }
        public string? observaciones { get; set; }
        public string? avances { get; set; }
        public DateTime fechaRegistro { get; set; }

    }
}
