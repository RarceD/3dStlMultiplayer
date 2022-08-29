using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalrProject.Controllers.Dto;
using SignalrProject.Model;
using System.Text.Json;

namespace SignalrProject.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class BullingController : ControllerBase
    {
        private Bulling _bullingData;
        public BullingController(Bulling bullingData)
        {
            _bullingData = bullingData;
        }

        #region GET

        [HttpGet]
        public List<string> GetAll()
        {
            return _bullingData.GetMsgs();
        }

        #endregion

        [HttpPost]
        public string AddPhrase(string msg)
        {
            _bullingData.AddMsg(msg);
            return "ok";
        }
    }
}

