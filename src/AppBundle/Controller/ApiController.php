<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Link;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\HttpFoundation\Response;

class ApiController extends Controller
{
    /**
     * @Route("/api/url", name="url")
     */
    public function urlAction(Request $request)
    {
        $code = $request->request->get('code') ? $request->request->get('code') : bin2hex(random_bytes(3));
        $url = $request->request->get('url');
        $userid = $request->request->get('userid');
        $userhash = $request->request->get('userhash');
        $msg = $this->createUrl($url, $code, $userid, $userhash);
        return $msg;
    }

    /**
     * @Route("/api/url/jsonp", name="jsonpUrl")
     */
    public function jsonpUrlAction(Request $request)
    {
        $code = $request->query->get('code') ? $request->query->get('code') : bin2hex(random_bytes(3));
        $url = $request->query->get('url');
        $userid = $request->query->get('userid');
        $userhash = $request->query->get('userhash');
        $msg = $this->createUrl($url, $code, $userid, $userhash);
        return new Response('h8ecallback('.$msg->getContent().');');
    }

    private function createUrl($url=null, $code=null, $userid=null, $userhash=null)
    {
        $code = strtolower($code);
        $msg =[
            'status' => false,
            'msg' => '',
            'data' => []
        ];

        if(!preg_match('/^[a-z0-9_-]+$/i', $code))
        {
            $msg['msg'] = '自定义名只能包含数字、小写字母、中划线和下划线';
            return $this->json($msg);
        }

        if($url=='' && !$this->checkUrl($url))
        {
            $msg['msg'] = 'URL不能为空或者URL不合规';
            return $this->json($msg);
        }

        $em = $this->getDoctrine()->getManager();
        $link = $em->getRepository('AppBundle:Link')
                    ->findOneByCode($code);
        if($link)
        {
            $msg['msg'] = '你要使用的自定义名已经被占用';
            return $this->json($msg);
        }

        $user = $this->getUser();

        if(!$user && $userid && $userhash)
        {
            $em = $this->getDoctrine()->getManager();
            $userDao = $em->getRepository('AppBundle:User')
                    ->find($userid);
            if(md5($userDao->getPassword()) == $userhash)
            {
                $user = $userDao;
            }
        }

        $link = new Link();
        if (is_object($user) && $user instanceof UserInterface)
        {
            $link->setUser($user);
        }

        $link->setUrl($this->httpHeaderCheck($url));
        $link->setCode($code);
        $em->persist($link);
        $em->flush();

        $msg['status'] = true;
        $msg['msg'] = '创建成功';
        $msg['data'] = ['code'=>$code];
        return $this->json($msg);
    }

    private function checkUrl($url)
    {
        if(!preg_match('/http:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/is',$url))
        {
            return false;
        }
        return true;
    }

    private function httpHeaderCheck($url)
    {
        $newUrl = parse_url($url);
        if(!isset($newUrl['scheme']))
        {
            return 'http://'.$url;
        }
        return $url;
    }
}
