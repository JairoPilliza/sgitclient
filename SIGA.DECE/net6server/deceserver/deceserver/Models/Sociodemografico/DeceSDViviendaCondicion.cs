namespace deceserver.Models.Sociodemografico
{
    public class DeceSDViviendaCondicion
    {
        public int idDeceSDViviendaCondicion { get; set; }
        public int idDeceSociodemografico { get; set; }
        public int idDeceSDViviendaCondicionOpcion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
