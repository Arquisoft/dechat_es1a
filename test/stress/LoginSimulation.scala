package computerdatabase

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LoginSimulation extends Simulation {

	val httpProtocol = http
		.baseUrl("https://arquisoft.github.io")
		.inferHtmlResources()
		.acceptHeader("image/webp,*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.doNotTrackHeader("1")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_4 = Map(
		"Accept" -> "*/*",
		"Origin" -> "https://arquisoft.github.io")

	val headers_6 = Map(
		"Accept" -> "*/*",
		"Content-Type" -> "application/json",
		"Origin" -> "https://arquisoft.github.io")

	val headers_8 = Map("Accept" -> "text/css,*/*;q=0.1")

    val uri1 = "https://solid.community"

	val scn = scenario("LoginSimulation")
		.exec(http("request_0")
			.get("/dechat_es1a/")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.get("/dechat_es1a/assets/images/Inrupt.png")
			.resources(http("request_2")
			.get("/dechat_es1a/assets/images/Solid.png"),
            http("request_3")
			.get("/dechat_es1a/assets/images/Generic.png")))
		.pause(2)
		.exec(http("request_4")
			.get(uri1 + "/.well-known/openid-configuration")
			.headers(headers_4)
			.resources(http("request_5")
			.get(uri1 + "/jwks")
			.headers(headers_4),
            http("request_6")
			.post(uri1 + "/register")
			.headers(headers_6)
			.body(RawFileBody("LoginSimulation_0006_request.txt")),
            http("request_7")
			.get(uri1 + "/authorize?scope=openid&client_id=2fceff776afce4110eef1c4d3fa0bd2f&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL2FycXVpc29mdC5naXRodWIuaW8vZGVjaGF0X2VzMWEvY2FyZCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiIxblNtVVlVZXdXaEY2ckJyQUw5WUFHdWU2bmZjOGZqYXh2R3BzMHBLT2RnIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJzaExXelcyeXRrODBUdmFXb2tHSGFLWS1BNjA0SkxmV0JaclBzRV9wTWNheEdvVWZWb3dEOXZhSVRZOTNCWVV2SFZ2NGRZUW9uREk5dExBR3N1SVh2WXlQWHJGNVVxeUJuQjNHcGM2YS1FdWpzaGpWNzBnSlUxNjIxU2k2R09pckNyZGFSQmFoY0pXSHdQN2QtNlgtZDJzTFFTOU5Kd2E2ZzZuZGtPQ19EMS1DcFkzSlVQY09RY1hQNEdKNUl6NTFfeHdRYVR4bkM1aHhfSk5WeEpZajVBdmhuS1F6U2VuLWhDWHVBQ1ZyMVl2YXVzcllyOWpjaFdjTlNYTTZCbUhTZjFEemExS2ZFSGNZcVBMOGtFZGMydFBlSHI1VUtQTXVjRkowOXF2SGlvc2M3N3pVcV9EXzJMc2Q0S3hzNHFxMnpuZVlaUjN2cFlaMWpOb2dpMnNtZ1EifX0.&state=KtZrGBDYvP8xqV_nZ1BGQobxb1ScHmBGgr88WEWzPTE")
			.headers(headers_0),
            http("request_8")
			.get(uri1 + "/common/css/bootstrap.min.css")
			.headers(headers_8),
            http("request_9")
			.get(uri1 + "/common/css/solid.css")
			.headers(headers_8)))
		.pause(21)
		.exec(http("request_10")
			.post(uri1 + "/login/password")
			.headers(headers_0)
			.formParam("username", "Berme")
			.formParam("password", "Qocsadom-2019")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "2fceff776afce4110eef1c4d3fa0bd2f")
			.formParam("redirect_uri", "")
			.formParam("state", "KtZrGBDYvP8xqV_nZ1BGQobxb1ScHmBGgr88WEWzPTE")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL2FycXVpc29mdC5naXRodWIuaW8vZGVjaGF0X2VzMWEvY2FyZCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiIxblNtVVlVZXdXaEY2ckJyQUw5WUFHdWU2bmZjOGZqYXh2R3BzMHBLT2RnIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJzaExXelcyeXRrODBUdmFXb2tHSGFLWS1BNjA0SkxmV0JaclBzRV9wTWNheEdvVWZWb3dEOXZhSVRZOTNCWVV2SFZ2NGRZUW9uREk5dExBR3N1SVh2WXlQWHJGNVVxeUJuQjNHcGM2YS1FdWpzaGpWNzBnSlUxNjIxU2k2R09pckNyZGFSQmFoY0pXSHdQN2QtNlgtZDJzTFFTOU5Kd2E2ZzZuZGtPQ19EMS1DcFkzSlVQY09RY1hQNEdKNUl6NTFfeHdRYVR4bkM1aHhfSk5WeEpZajVBdmhuS1F6U2VuLWhDWHVBQ1ZyMVl2YXVzcllyOWpjaFdjTlNYTTZCbUhTZjFEemExS2ZFSGNZcVBMOGtFZGMydFBlSHI1VUtQTXVjRkowOXF2SGlvc2M3N3pVcV9EXzJMc2Q0S3hzNHFxMnpuZVlaUjN2cFlaMWpOb2dpMnNtZ1EifX0.")
			.resources(http("request_11")
			.get("/dechat_es1a/card")
			.headers(headers_0)
			.check(status.is(404)),
            http("request_12")
			.get("/dechat_es1a/assets/images/Solid_Pattern.png"),
            http("request_13")
			.get("/dechat_es1a/assets/images/Solid_Pattern.png"))
			.check(status.is(404)))

	setUp(scn.inject(atOnceUsers(60))).protocols(httpProtocol)
}