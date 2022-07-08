namespace deceserver.Models.Sociodemografico
{
    public class DeceSDAntecedenteDificultadEscolar
    {
        public int idDeceSDAntecedenteDificultadEscolar { get; set; }
        public int idDeceSociodemografico { get; set; }
        public int idDeceSDAntecedenteDificultadEscolarOpcion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
