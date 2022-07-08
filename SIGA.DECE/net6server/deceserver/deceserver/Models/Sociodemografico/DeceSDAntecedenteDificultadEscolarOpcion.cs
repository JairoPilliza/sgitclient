namespace deceserver.Models.Sociodemografico
{
    public class DeceSDAntecedenteDificultadEscolarOpcion
    {
        public int idDeceSDAntecedenteDificultadEscolarOpcion { get; set; }
        public int codigo { get; set; }
        public int opcionTipo { get; set; }
        public string? atributoName { get; set; }
        public string? nombrePropiedad { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
        public bool estado { get; set; }
    }
}
