using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using DeepSeek.Dto;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("api/[controller]")]
public class DeepSeekController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public DeepSeekController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpPost("message")]
    public async Task<IActionResult> StreamResponse([FromBody] MessageRequest messageRequest)
    {
        var client = _httpClientFactory.CreateClient("DeepSeekClient");

        var data = new { prompt = messageRequest.Message, model = messageRequest.Model };

        var request = new HttpRequestMessage(HttpMethod.Post, "generate")
        {
            Content = new StringContent(
                JsonConvert.SerializeObject(data),
                System.Text.Encoding.UTF8,
                "application/json"
            ),
        };

        var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
        response.EnsureSuccessStatusCode();

        var stream = await response.Content.ReadAsStreamAsync();
        return new FileStreamResult(stream, "application/octet-stream");
    }
}
