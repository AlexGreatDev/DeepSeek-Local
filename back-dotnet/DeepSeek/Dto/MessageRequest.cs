namespace DeepSeek.Dto
{
    public class MessageRequest
    {
        public required string Message { get; set; }
        public string Model { get; set; } = "deepseek-r1:1.5b";
    }
}
