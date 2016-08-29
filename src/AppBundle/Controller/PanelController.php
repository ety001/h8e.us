<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class PanelController extends Controller
{
    /**
     * @Route("/m/panel", name="panel")
     */
    public function indexAction(Request $request)
    {
        $paginator  = $this->get('knp_paginator');
        $em = $this->getDoctrine()->getManager();
        $baseUrl = $this->generateUrl('jump',[],UrlGeneratorInterface::ABSOLUTE_URL);
        $user = $this->getUser();
        $page = $request->query->get('page', 1);
        $limit = 10;
        
        $conditions = [
            'user' => $user
        ];
        $linkRepo = $em->getRepository('AppBundle:Link');
        $links = $linkRepo->getLinks($conditions, 'al.createdAt desc', $paginator, $page, $limit);
        
        return $this->render('panel/index.html.twig', ['links'=>$links, 'baseUrl'=>$baseUrl]);
    }
}