<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Link;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $baseUrl = $request->getScheme().'://'.$request->getHost();
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', ['baseUrl'=>$baseUrl]);
    }

    /**
     * @Route("/u/{code}", name="jump")
     */
    public function jumpAction($code='', Request $request)
    {
        if($code)
        {
            $em = $this->getDoctrine()->getManager();
            $link = $em->getRepository('AppBundle:Link')
                    ->findOneByCode($code);
            if(is_object($link) && $link instanceof Link)
            {
                $link->setCounter( $link->getCounter() + 1 );
                $em->flush();
                return $this->redirect($link->getUrl());
            }
            else
            {
                return $this->redirectToRoute('homepage', array('from' => 'jump_not_link'));
            }
        }
        else
        {
            return $this->redirectToRoute('homepage', array('from' => 'jump'));
        }
    }

    /**
     * @Route("/admin", name="admin")
     */
    public function adminAction()
    {
        echo 1;die();
    }
}
