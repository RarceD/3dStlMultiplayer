using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalrProject.Controllers.Dto;
using SignalrProject.DB;
using SignalrProject.Model;
using System.Text.Json;

namespace SignalrProject.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class BullingController : ControllerBase
    {
        private DbBulling _dbBulling;

        private Dictionary<string, int> _fantasticWords;
        public BullingController(DbBulling dbClient)
        {
            _dbBulling = dbClient;
            _fantasticWords = _dbBulling.LoadFantasticWords();
        }

        #region GET

        [HttpGet]
        public List<WeddingMsgDto> GetAll(string? delete)
        {
            if (delete == null)
            {
                return _dbBulling.AllMsg();
            }
            else
            {
                _dbBulling.DeleteMessage(Int32.Parse(delete));
                return _dbBulling.AllMsg();
            }
        }
        #endregion

        [HttpPost]
        public BullingResponseDto AddMsg(WeddingMsgReceived input)
        {
            var result = IsSuccessfullMsg(input);
            // Not storing in db void msg:
            if (input.Msg == "") return result;
            _dbBulling.AddMsg(input.Msg);
            return result;
        }

        private BullingResponseDto IsSuccessfullMsg(WeddingMsgReceived input)
        {
            var r = new BullingResponseDto();
            var slutStr = input.Msg.ToString().ToLower();
            foreach (var w in _fantasticWords)
            {
                if (slutStr.Contains(w.Key.ToLower()))
                {
                    r.SuccessWord = w.Key;
                    if (w.Value < 10)
                    {
                        r.ResponseType = BullingResponseDto.Reward.GUMMY;
                    }
                    else if (w.Value <= 14)
                    {
                        r.ResponseType = BullingResponseDto.Reward.SHOT;
                    }
                    else
                    {
                        r.ResponseType = BullingResponseDto.Reward.TWO_SHOTS;
                    }
                    return r;
                }
            }
            r.SuccessWord = "";
            r.ResponseType = BullingResponseDto.Reward.NO_REWARD;
            return r;
        }


    }
}

