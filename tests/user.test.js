const request = require("supertest");
const axios = require('axios');
require('dotenv').config();
const { createApp } = require("../app");
const appDataSource = require("../models/dataSource");
const userService = require('../services/userService');

jest.mock('axios');

describe('user/signin', () => {

    let app;

    const req = {
        query: {authorizationCode: ["authorizationCode", "1234", undefined]}
    };
    
    const res = {
        status: jest.fn(() => res)
    }

    beforeAll(async() => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async() => {
        // await appDataSource.query('set foreign_key_checks=0')
        // await appDataSource.query('TRUNCATE users');
        // await appDataSource.query('set foreign_key_checks=1')
        await appDataSource.destroy();
    });

    describe('authorizationCode', () => {
        
        test('SUCCESS: signIn', async() => {

            axios.post.mockResolvedValue({
                data: {
                    access_token: 'y5ik3-HjB1LwCnq69WlEIfIbEjBjK90_OWo38pYACisMpgAAAYRaETgs',
                    token_type: 'bearer',
                    refresh_token: 'VYTgadDdzxwbTVZObsCDbC1IjZ4egu8wpfv-AgO1CisMpgAAAYRaETgr',
                    expires_in: 21599,
                    scope: 'birthday account_email profile_image gender profile_nickname',   
                    refresh_token_expires_in: 5183999
                  }
            })
    
            await request(app)
                .get(`/user/signin?authorizationCode=${req.query.authorizationCode[0]}`)
                .send({
                    method: 'post',
                    url: 'https://kauth.kakao.com/oauth/token',
                    headers: {'Content-type':'application/x-www-form-urlencoded;charset=utf-8'},
                    data: {
                        grant_type: 'GRANT_TYPE',
                        client_id: 'REST_API_KEY',
                        redirect_uri: 'REDIRECT_URI',
                        code: req.query.authorizationCode
                    }
                })
                .expect(200)
                .expect(axios.post())
        });
    
        it('FAILED: authorizationCode_IS_NOT_VALID', async() => {

            axios.post.mockRejectedValue(new Error("KEY_ERROR"))
    
            await request(app)
                .get(`/user/signin?authorizationCode=${req.query.authorizationCode[1]}`)
                .send({
                    method: 'post',
                    url: 'https://kauth.kakao.com/oauth/token',
                    headers: {'Content-type':'application/x-www-form-urlencoded;charset=utf-8'},
                    data: {
                        grant_type: 'GRANT_TYPE',
                        client_id: 'REST_API_KEY',
                        redirect_uri: 'REDIRECT_URI',
                        code: req.query.authorizationCode
                    }
                })
                .expect(401)
                .expect(axios.post());
        });
    
        it('FAILED: NEED_authorizationCode', async() => {

            axios.post.mockRejectedValue(new Error("Request failed with status code 400"))
    
            await request(app)
                .get(`/user/signin?authorizationCode=${req.query.authorizationCode}`)
                .send({
                    method: 'post',
                    url: 'https://kauth.kakao.com/oauth/token',
                    headers: {'Content-type':'application/x-www-form-urlencoded;charset=utf-8'},
                    data: {
                        grant_type: 'GRANT_TYPE',
                        client_id: 'REST_API_KEY',
                        redirect_uri: 'REDIRECT_URI',
                        code: req.query.authorizationCode
                    }
                })
                .expect(400)
                .expect(axios.post());
        });
    })
    

    test('FAILED: getKakaoAcessToken', async() => {
        axios.get = jest.fn().mockReturnValues({
            data: {
                access_token: 'y5ik3-HjB1LwCnq69WlEIfIbEjBjK90_OWo38pYACisMpgAAAYRaETgs',
                token_type: 'bearer',
                refresh_token: 'VYTgadDdzxwbTVZObsCDbC1IjZ4egu8wpfv-AgO1CisMpgAAAYRaETgr',
                expires_in: 21599,
                scope: 'birthday account_email profile_image gender profile_nickname',   
                refresh_token_expires_in: 5183999
              }
        })

        await request(app)
            .post('/user/signin')
            .send({
                method: 'post',
                url: 'https://kauth.kakao.com/oauth/token',
                headers: {'Content-type':'application/x-www-form-urlencoded;charset=utf-8'},
                data: qs.stringify({
                    grant_type: GRANT_TYPE,
                    client_id: REST_API_KEY,
                    redirect_uri: REDIRECT_URI,
                    code: undefined
                })
            })
            .expect(400)
            .expect({message: 'Request failed with status code 400'});
    });       
})