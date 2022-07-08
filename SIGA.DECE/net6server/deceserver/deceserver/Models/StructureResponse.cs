namespace deceserver.Models
{
    public class StructureResponse
    {
        public string code { get; set; } = string.Empty;
        public string message { get; set; } = string.Empty;
        public string messageTitle { get; set; } = string.Empty;
        public dynamic? payload { get; set; }
        public string redirectTo { get; set; } = string.Empty;
        public void toString(string code, string message, string messageTitle = "", dynamic? payload = null)
        {
            this.code = code;
            this.message = message;
            this.messageTitle = messageTitle;
            this.payload = payload;
        }
    }
}
